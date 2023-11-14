import { useMutation, useQuery } from '@tanstack/react-query';

type Food = {
  name: string;
  price: number;
};

export const Menu = () => {
  const fetchMenu = async () => {
    const response = await fetch({process.env.BACKEND_URL} + '/menu');
    const data = await response.json();
    return data as Food[];
    // TODO: Type guard this, and throw error if not correct type.
  };
  const { data, error, isLoading } = useQuery(['menu'], fetchMenu);
  const { mutate: placeOrder } = useMutation((food: Food) => {
    return fetch({process.env.BACKEND_URL}+'/order', {
      method: 'POST',
      body: JSON.stringify(food),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Something went wrong</div>;
  }

  const handlePlaceOrder = (food: Food) => {
    placeOrder(food);
  };

  return (
    <div>
      <h1>Menu</h1>
      {data?.map((food) => (
        <li>
          {food.name} - {food.price}
          <button onClick={() => handlePlaceOrder(food)}>Add to cart</button>
        </li>
      ))}
    </div>
  );
};
