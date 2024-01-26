import React, { useEffect, useState } from "react";

const Table = ({ form, setForm }) => {
  const [rowsWidth, setRowsWidth] = useState(
    window.innerWidth < 750 ? window.innerWidth * 0.9 : window.innerWidth * 0.35
  );

  function addColumn() {
    setForm((pre) => {
      return { ...pre, table: [...pre.table, { head: "", rows: [""] }] };
    });
  }

  function removeColumn(i) {
    setForm((pre) => {
      const copy = { ...pre };
      copy.table.splice(i, 1);
      return { ...copy };
    });
  }

  function addRows(i) {
    setForm((pre) => {
      const copy = { ...pre };
      copy.table[i].rows.push("");
      return { ...copy };
    });
  }
  function removeRow(i, j) {
    setForm((pre) => {
      const copy = { ...pre };
      copy.table[i].rows.splice(j, 1);
      return { ...copy };
    });
  }

  function onHeadChnage(i, value) {
    setForm((pre) => {
      const copy = { ...pre };
      copy.table[i].head = value;
      return { ...copy };
    });
  }

  function onRowChnage(i, j, value) {
    setForm((pre) => {
      const copy = { ...pre };
      copy.table[i].rows[j] = value;
      return { ...copy };
    });
  }
  useEffect(() => {
    function onResize() {
      setRowsWidth(
        window.innerWidth < 750
          ? window.innerWidth * 0.8
          : window.innerWidth * 0.35
      );
    }
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  });
  return (
    <>
      <span className="d-flex gap-2">
        <h5>Tabuler Data </h5>
        <span>
          <button type="button" className="" onClick={() => addColumn()}>
            new Column
          </button>
        </span>
      </span>
      <div className="tabuler-from">
        {form.table?.map((item, i) => {
          const { head, rows } = item;
          return (
            <div key={i} className="table-column">
              <button  type="button" onClick={() => removeColumn(i)}>remove</button>
              <input
                placeholder="Header"
                value={head}
                onChange={(e) => onHeadChnage(i, e.target.value)}
                name={`head${i}`}
              />
              {rows?.map((row, j) => {
                return (
                  <span key={j}>
                    <textarea
                      placeholder="row"
                      rows={1}
                      style={{ width: `${rowsWidth}px` }}
                      onChange={(e) => onRowChnage(i, j, e.target.value)}
                      value={row}
                      name={`row${j}`}
                      type="text"
                    />
                    {j !== 0 ? (
                      <button  type="button" onClick={() => removeRow(i, j)}>delete</button>
                    ) : null}
                  </span>
                );
              })}
              <button  type="button" onClick={() => addRows(i)}>add</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Table;
