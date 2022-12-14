export async function getCategories() {
  // Implemente aqui
  return fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((response) => response.json())
    .then((data) => data);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);

  const data = await response.json();

  return data;
}

export async function getProductsFromQuery(query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);

  const data = await response.json();

  return data.results;
}

export async function getDetailProduct(item) {
  const response = await fetch(`https://api.mercadolibre.com/items/${item}`);

  const data = await response.json();
  return data;
}
