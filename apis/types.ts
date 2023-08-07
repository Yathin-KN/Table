export interface DrinksCategory {
  drinksCategory: string;
  drinks_Category_id: string;
}

interface BaseEntity {
  _id: string;
  foodName: string;
  foodPrice: string;
  food_id: string;
  foodCategories: string;
  type: string;
}

// Extend BaseEntity for CartItem
export interface CartItem extends BaseEntity {
  quantity_bought: number;
}

// Extend BaseEntity for Drinks
export interface Drinks extends BaseEntity {
  drinkName: string;
  drinkNamePrice: string;
  drink_id: string;
  drinkCategories: string;
  filenames?: string;
  drinks_category_id: string;
  drinkPrice:string;
}

// Extend BaseEntity for Dish
export interface Dish extends BaseEntity {
  filenames: string;
  food_category_id: string;
  __v: number;
}

export interface DishProps{
  foodName: string;
  foodPrice: string;
  food_id: string;
  foodCategories: string;
  filenames: string;
  type: string;
  food_category_id: string;
}

export interface DrinkManager {
  name?: string;
  phoneNo?: string;
  manager_id: string;
  kitchen: string;
  accepted: string;
  orderForPickup: string;
  rejectedItems_id: string;
  Orders_id: string;
}

export interface FoodCategory {
  food_Category: string;
  food_Category_id: string;
}

export interface FoodManager {
  name?: string;
  phoneNo?: string;
  manager_id: string;
  kitchen: string;
  accepted: string;
  orderForPickup: string;
  rejectedItems_id: string;
  Orders_id: string;
}

export interface Menu {
  food_id: string;
  drink_id: string;
}

export interface Order {
  status: string;
  drink_id: string;
  food_id: string;
  order_id: string;
}

export interface Orders {
  tableNo: string;
  active: string;
  user_id: string;
  status: string;
  Orders_id: string;
  time: string;
  date: string;
  order_id: string;
}

export interface RejectedItems {
  food_id?: string;
  user_id?: string;
  drink_id?: string;
  rejectedItems_id: string;
  order_id?: string;
  reason?: string;
}

export interface Orders {
  tableNo: string;
  active: string;
  user_id: string;
  status: string;
  Orders_id: string;
  time: string;
  date: string;
  order_id: string;
}

export interface Staff {
  name: string;
  phoneNo: string;
  tableNoAssigned: string;
  staff_id: string;
  Orders_id: string;
}

export interface Table {
  tableNo: string;
  active: string;
}

export interface CartItem {
  _id: string;
  foodCategories: string;
  foodName: string;
  foodPrice: string;
  food_category_id: string;
  food_id: string;
  type: string;
  quantity_bought:number;
}

export interface CartCard {
  _id: string;
  foodCategories: string;
  foodName: string;
  foodPrice: string;
  food_category_id: string;
  food_id: string;
  type: string;
  quantity_bought:number;
}

export interface FoodQty {
  food_id: string;
  quantity_bought: number;
}