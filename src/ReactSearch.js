// import React, { Component } from "react";
// import {
//   InstantSearch,
//   SearchBox,
//   Hits,
//   Highlight,
//   Stats,
//   RefinementList,
//   Menu
// } from "react-instantsearch/dom";

// import "./ReactSearch.scss";

// const SideBar = () => {
//   return (
//     <div className="sidebar">
//       <h1>Category</h1>
//       <RefinementList attribute="category" />
//     </div>
//   );
// };

// const Hit = ({ hit }) => {
//   return (
//     <div className="ht">
//       <div className="hit-image">
//         <img src={hit.productImage} />
//       </div>
//       <div className="hit-content">
//         <div className="hit-price">${hit.price}</div>
//         <div className="hit-name">{hit.title}</div>
//         <div className="hit-description">{hit.desc}</div>
//       </div>
//     </div>
//   );
// };

// const Content = () => {
//   return <Hits hitComponent={Hit} />;
// };

// class ReactSearch extends Component {
//   render() {
//     return (
//       <div style={{ marginTop: "100px" }}>
//         <InstantSearch
//           apiKey="bc368cd1a5f9f34a7c0e6db44c577a3f"
//           appId="NCOGNMBZ7I"
//           indexName="productSchema"
//         >
//           <header className="header">
//             <SearchBox translation={{ placeholder: "Search for products.." }} />
//           </header>
//           <main>
//             <SideBar />
//             <Content />
//           </main>
//         </InstantSearch>
//       </div>
//     );
//   }
// }

// export default ReactSearch;
