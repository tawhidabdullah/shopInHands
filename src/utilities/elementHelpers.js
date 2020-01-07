const isElementExists = (elements, elementType) => {
  return (
    Object.keys(elements.find(element => element.type === elementType) || [])
      .length > 0 || false
  );
};

const getElement = (elements, elementType) => {
  return elements.find(element => element.type === elementType) || false;
};

export { isElementExists, getElement };
