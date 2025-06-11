import Link from 'next/link';

export default async function Home() {
  const response = await fetch('http://localhost:8080');
  const data = await response.json();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Recipes
      </h1>
      <ul className="space-y-4">
        {data.meals.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link
              href={`/recipe/${recipe.idMeal}`}
              className="block p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
            >
              <span className="text-lg font-medium text-indigo-600">
                {recipe.strMeal}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

