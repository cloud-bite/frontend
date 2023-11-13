import { useMutation, useQuery } from '@tanstack/react-query';
import { backend_ip } from 'config.json';

type Food = {
  name: string;
  price: number;
};

export const Menu = () => {
  const fetchMenu = async () => {
    const response = await fetch(backend_ip[0].value + '/menu');
    const data = await response.json();
    return data as Food[];
    // TODO: Type guard this, and throw error if not correct type.
  };
  const { data, error, isLoading } = useQuery(['menu'], fetchMenu);
  const { mutate: placeOrder } = useMutation((food: Food) => {
    return fetch(backend_ip[0].value + '/order', {
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
