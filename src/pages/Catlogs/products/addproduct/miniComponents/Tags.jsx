import React,{useState} from 'react'

const Tags = ({ form, setForm }) => {
    const [tag, setTag] = useState("");
  return (
    <>
               <div className="tags_list">
                {form.tags.map((tag, i) => {
                  return (
                    <p key={i}>
                      {tag}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setForm((pre) => {
                            const copy_tags = [...pre.tags];
                            copy_tags.splice(i, 1);
                            return { ...pre, tags: copy_tags };
                          });
                        }}
                      >
                        X
                      </button>
                    </p>
                  );
                })}
              </div>
              <div>
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!tag) return;
                    setForm((pre) => ({ ...pre, tags: [tag, ...pre.tags] }));
                    setTag("");
                  }}
                >
                  add
                </button>
              </div> 
    </>
  )
}

export default Tags
