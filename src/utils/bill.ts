import { selectUserAndOtp } from './../../store/slices/authSlice';
import { selectDishItems } from './../../store/slices/cartDishSlice';
import { selectDrinkItems } from './../../store/slices/cartDrink';
import { Orders, OrderDish, OrderDrink } from './../../apis/types';
import { useSelector } from 'react-redux';

export function createOrder(): Orders {
    const { user, tableNo } = useSelector(selectUserAndOtp);
  
    const dishItems = useSelector(selectDishItems);
    const drinkItems = useSelector(selectDrinkItems);
  
    const orderDishes: OrderDish[] = dishItems.map((item) => ({
      foodName: item.foodName,
      food_id: item.food_id,
      quantity: item.quantity_bought.toString(),
    }));
  
    const orderDrinks: OrderDrink[] = drinkItems.map((item) => ({
      drinkName: item.drinkName,
      quantity: item.quantity_bought.toString(),
      drink_id: item.drink_id,
    }));
  
    const order: Orders = {
      tableNo: tableNo,
      user_id: user.user_id,
      drinks: orderDrinks.length > 0 ? orderDrinks : undefined,
      dishes: orderDishes.length > 0 ? orderDishes : undefined,
    };
  
    console.log(order);
    return order;
  }