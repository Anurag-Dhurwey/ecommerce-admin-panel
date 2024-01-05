// const FormInput = (props) => {
//     const { name, value, setForm, type, label, id, className,min } = props;
//     if (type === "textarea") {
//       return (
//         <div className="w-50  ">
//           <textarea
//             // style={{ maxWidth: "100%" }}
//             // className={`form-control ${className}`}
//             style={{width:"99%"}}
//             className={`${className}`}
//             id={id}
//             placeholder={label}
//             name={name}
//             value={value}
//             onChange={(e) =>
//               setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }))
//             }
//             rows="3"
//           ></textarea>
//         </div>
//       );
//     }
//     return (
//       <div className="w-100  ">
//         <input
//           // style={{ maxWidth: "98%" }}
//           // className={`form-control ${className}`}
//           style={{width:"95%"}}
//           className={`${className}`}
//           type={type}
//           id={id}
//           placeholder={label}
//           name={name}
//           value={value}
//           min={min}
//           onChange={(e) =>
//             setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }))
//           }
//         />
//       </div>
//     );
//   };
  
//   export default FormInput;
  