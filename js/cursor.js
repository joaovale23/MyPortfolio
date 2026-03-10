// ── Custom cursor ──
const cur = document.getElementById('cur');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});

// hover feedback on interactive elements
document.addEventListener('mouseover', e => {
  if (e.target.closest('a, button, input, textarea, select, [role="button"], .clickable')) {
    cur.classList.add('hover');
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('a, button, input, textarea, select, [role="button"], .clickable')) {
    cur.classList.remove('hover');
  }
});

// click feedback
document.addEventListener('mousedown', () => cur.classList.add('click'));
document.addEventListener('mouseup',   () => cur.classList.remove('click'));

// ── Drag desktop icons + OS-style selection rectangle ──
(function () {
  let dragging = null, offsetX = 0, offsetY = 0;
  let startX = 0, startY = 0, hasMoved = false;
  let dragSiblings = []; // other selected icons being moved along
  const DRAG_THRESHOLD = 5;

  // ── Selection rectangle state ──
  const selRect = document.getElementById('selection-rect');
  let selecting = false;
  let selStartX = 0, selStartY = 0;

  function clearSelection() {
    document.querySelectorAll('.desk-icon.selected').forEach(ic => ic.classList.remove('selected'));
  }

  function rectsIntersect(a, b) {
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }

  function updateSelectionFromRect() {
    const sr = selRect.getBoundingClientRect();
    document.querySelectorAll('.desk-icon').forEach(ic => {
      const ir = ic.getBoundingClientRect();
      ic.classList.toggle('selected', rectsIntersect(sr, ir));
    });
  }

  // ── Mousedown: start icon drag or selection rectangle ──
  document.addEventListener('mousedown', e => {
    // Ignore if clicking on windows, taskbar, or other UI
    const desktop = document.getElementById('desktop');
    if (!desktop.contains(e.target) && !e.target.closest('#desk-icons')) return;
    if (e.target.closest('.os-window, .app-window, #taskbar, #statusbar, #topbar')) return;

    const icon = e.target.closest('.desk-icon');

    if (icon) {
      // ── Clicked on an icon ──
      if (e.ctrlKey || e.metaKey) {
        // Ctrl+click: toggle selection
        icon.classList.toggle('selected');
      } else if (!icon.classList.contains('selected')) {
        // Click without ctrl on unselected: select only this one
        clearSelection();
        icon.classList.add('selected');
      }
      // Start potential drag of the icon (+ siblings)
      dragging = icon;
      hasMoved = false;
      const rect = icon.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      startX = e.clientX;
      startY = e.clientY;
      // Record initial positions of other selected icons relative to drag start
      dragSiblings = [];
      document.querySelectorAll('.desk-icon.selected').forEach(sib => {
        if (sib === icon) return;
        dragSiblings.push({ el: sib, origLeft: parseFloat(sib.style.left), origTop: parseFloat(sib.style.top) });
      });
    } else {
      // ── Clicked on empty desktop: start selection rectangle ──
      if (!e.ctrlKey && !e.metaKey) clearSelection();
      selecting = true;
      selStartX = e.clientX;
      selStartY = e.clientY;
      selRect.style.left = selStartX + 'px';
      selRect.style.top = selStartY + 'px';
      selRect.style.width = '0px';
      selRect.style.height = '0px';
      selRect.style.display = 'none'; // show only after threshold
    }
  });

  // ── Mousemove: drag icon or stretch selection rectangle ──
  document.addEventListener('mousemove', e => {
    // Selection rectangle
    if (selecting) {
      const dx = e.clientX - selStartX;
      const dy = e.clientY - selStartY;
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        selRect.style.display = 'block';
      }
      const x = Math.min(e.clientX, selStartX);
      const y = Math.min(e.clientY, selStartY);
      const w = Math.abs(dx);
      const h = Math.abs(dy);
      selRect.style.left = x + 'px';
      selRect.style.top = y + 'px';
      selRect.style.width = w + 'px';
      selRect.style.height = h + 'px';
      if (selRect.style.display === 'block') updateSelectionFromRect();
      return;
    }

    // Icon drag
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!hasMoved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
    hasMoved = true;
    dragging.classList.add('dragging');
    const parent = dragging.parentElement.getBoundingClientRect();
    let x = e.clientX - parent.left - offsetX;
    let y = e.clientY - parent.top - offsetY;
    x = Math.max(0, Math.min(x, parent.width - dragging.offsetWidth));
    y = Math.max(0, Math.min(y, parent.height - dragging.offsetHeight));
    dragging.style.left = x + 'px';
    dragging.style.top  = y + 'px';
    // Move siblings along with the same delta
    dragSiblings.forEach(s => {
      s.el.classList.add('dragging');
      let sx = s.origLeft + dx;
      let sy = s.origTop + dy;
      sx = Math.max(0, Math.min(sx, parent.width - s.el.offsetWidth));
      sy = Math.max(0, Math.min(sy, parent.height - s.el.offsetHeight));
      s.el.style.left = sx + 'px';
      s.el.style.top  = sy + 'px';
    });
  });

  // Grid settings for icon snapping (must match terminal.js addDesktopIcon)
  const REM = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const GRID_W = 6.929 * REM;
  const GRID_H = 6.929 * REM;
  const GRID_PAD_X = 0.929 * REM;
  const GRID_PAD_Y = 0.929 * REM;

  function getOccupiedCells(exclude) {
    const icons = document.querySelectorAll('.desk-icon');
    const cells = [];
    icons.forEach(ic => {
      if (ic === exclude) return;
      const col = Math.round((parseFloat(ic.style.left) - GRID_PAD_X) / GRID_W);
      const row = Math.round((parseFloat(ic.style.top) - GRID_PAD_Y) / GRID_H);
      cells.push(col + ',' + row);
    });
    return new Set(cells);
  }

  function findNearestFree(col, row, occupied, maxCols, maxRows) {
    if (!occupied.has(col + ',' + row)) return { col, row };
    for (let dist = 1; dist < maxCols + maxRows; dist++) {
      for (let dc = -dist; dc <= dist; dc++) {
        for (let dr = -dist; dr <= dist; dr++) {
          if (Math.abs(dc) + Math.abs(dr) !== dist) continue;
          const nc = col + dc, nr = row + dr;
          if (nc < 0 || nr < 0 || nc >= maxCols || nr >= maxRows) continue;
          if (!occupied.has(nc + ',' + nr)) return { col: nc, row: nr };
        }
      }
    }
    return { col, row };
  }

  // ── Mouseup: finish icon drag or selection rectangle ──
  document.addEventListener('mouseup', () => {
    // Finish selection rectangle
    if (selecting) {
      selRect.style.display = 'none';
      selecting = false;
    }

    // Finish icon drag
    if (dragging) {
      dragging.classList.remove('dragging');
      if (hasMoved) {
        // Collect all moved icons (main + siblings)
        const allMoved = [dragging, ...dragSiblings.map(s => s.el)];
        const excludeSet = new Set(allMoved);
        const parent = dragging.parentElement.getBoundingClientRect();
        const maxCols = Math.max(1, Math.floor((parent.width - GRID_PAD_X) / GRID_W));
        const maxRows = Math.max(1, Math.floor((parent.height - GRID_PAD_Y) / GRID_H));

        // Build occupied set excluding all moved icons
        const occupiedBase = getOccupiedCells(null);
        // Remove cells of moved icons from occupied
        const movedPositions = new Set();
        allMoved.forEach(ic => {
          const c = Math.round((parseFloat(ic.style.left) - GRID_PAD_X) / GRID_W);
          const r = Math.round((parseFloat(ic.style.top) - GRID_PAD_Y) / GRID_H);
          movedPositions.add(c + ',' + r);
        });

        // Snap each moved icon one by one
        const occupied = new Set();
        document.querySelectorAll('.desk-icon').forEach(ic => {
          if (excludeSet.has(ic)) return;
          const c = Math.round((parseFloat(ic.style.left) - GRID_PAD_X) / GRID_W);
          const r = Math.round((parseFloat(ic.style.top) - GRID_PAD_Y) / GRID_H);
          occupied.add(c + ',' + r);
        });

        allMoved.forEach(ic => {
          let col = Math.round((parseFloat(ic.style.left) - GRID_PAD_X) / GRID_W);
          let row = Math.round((parseFloat(ic.style.top) - GRID_PAD_Y) / GRID_H);
          col = Math.max(0, Math.min(col, maxCols - 1));
          row = Math.max(0, Math.min(row, maxRows - 1));
          const free = findNearestFree(col, row, occupied, maxCols, maxRows);
          ic.style.left = (GRID_PAD_X + free.col * GRID_W) + 'px';
          ic.style.top  = (GRID_PAD_Y + free.row * GRID_H) + 'px';
          occupied.add(free.col + ',' + free.row);
          ic.classList.remove('dragging');
          ic.dataset.justDragged = '1';
          setTimeout(() => delete ic.dataset.justDragged, 300);
        });
      }
      dragSiblings.forEach(s => s.el.classList.remove('dragging'));
      dragSiblings = [];
      dragging = null;
    }
  });
})();

// ── Clock (topbar) ──
const tbTime = document.getElementById('tb-time');

setInterval(() => {
  const n = new Date();
  if (tbTime) {
    tbTime.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()]
      .map(v => String(v).padStart(2, '0')).join(':');
  }
}, 1000);
