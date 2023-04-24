export async function getCategories() {
  const API_URL = 'https://api.mercadolibre.com/sites/MLB/categories';

  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query = '') {
  const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?category=';
  const response = await fetch(`${API_URL}${categoryId}&q=${query}`);
  const data = await response.json();

  return data;
}

export async function getProductById(productId) {
  const API_URL = `https://api.mercadolibre.com/items/${productId}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
}
