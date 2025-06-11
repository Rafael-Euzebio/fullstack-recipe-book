import Image from 'next/image'
import Link from 'next/link';

function extractIngredients(meal): string[] {
  const ingredients = [];

  // There are up to 20 ingredient fields, numbered 1–20
  for (let i = 1; i <= 20; i++) {
    const key = `strIngredient${i}`;
    const value = meal[key];

    // Include only non-null, non-empty string ingredients
    if (typeof value === 'string' && value.trim() !== '') {
      ingredients.push(value.trim());
    }
  }

  return ingredients;
}

export default async function Recipe({ params }: {
  params: { id: string }
}) {
  const { id } = params;
  const res = await fetch(`http://localhost:8080/info?id=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  const ingredients = extractIngredients(meal);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="flex justify-center">
        <Image
          src={meal.strMealThumb}
          alt={`image of ${meal.strMeal}`}
          width={400}
          height={500}
          className="rounded-lg shadow-md"
        />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 text-center">
        {meal.strMeal}
      </h1>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block text-indigo-600 hover:underline"
        >
          {meal.strArea}
        </Link>
      </div>

      <p className="text-gray-700 leading-relaxed">
        {meal.strInstructions}
      </p>

      <ul className="flex flex-row gap-3">
        {ingredients.map((ingredient) => (
          <li key={ingredient}>
            <Link
              href="/"
              className="block px-3 py-2 bg-white rounded-md shadow hover:bg-gray-50 transition"
            >
              {ingredient}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
