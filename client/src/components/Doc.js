function Doc({ docRef }) {
  return (
    <div>
      <div ref={docRef} className="doc" contentEditable="true"></div>
    </div>
  );
}

export default Doc;
