# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Ingredient.create([
	{ name: 'Mozzarella', ingredient_type: 'cheese', icon_image: '/assets/mozzarella.jpg', brush_image: '/assets/shredded-mozzarella.png', price: 1.99 },
	{ name: 'Parmesan', ingredient_type: 'cheese', icon_image: '/assets/parmesan.jpg', brush_image: '/assets/shredded-parmesan.png', price: 1.99 },
	{ name: 'Cheddar', ingredient_type: 'cheese', icon_image: '/assets/cheddar.jpg', brush_image: '/assets/shredded-cheddar.png', price: 1.99 },
	{ name: 'Feta', ingredient_type: 'cheese', icon_image: '/assets/feta.jpg', brush_image: '/assets/shredded-feta.png', price: 1.99 },
	{ name: 'Gorgonzola', ingredient_type: 'cheese', icon_image: '/assets/gorgonzola.jpg', brush_image: '/assets/shredded-gorgonzola.png', price: 1.99 },
	{ name: 'Hand Tossed', ingredient_type: 'crust', icon_image: '/assets/hand-tossed.png', brush_image: '/assets/hand-tossed.png', price: 1.99},
	{ name: 'Thin', ingredient_type: 'crust', icon_image: '/assets/thin-crust.png', brush_image: '/assets/thin-crust.png', price: 1.99},
	{ name: 'Deep Dish', ingredient_type: 'crust', icon_image: '/assets/deep-dish.png', brush_image: '/assets/deep-dish.png', price: 1.99},
	{ name: 'Whole Wheat', ingredient_type: 'crust', icon_image: '/assets/whole-wheat.png', brush_image: '/assets/whole-wheat.png', price: 1.99},
	{ name: 'Garlic', ingredient_type: 'crust', icon_image: '/assets/garlic-crust.png', brush_image: '/assets/garlic-crust.png', price: 1.99},
	{ name: 'Herb', ingredient_type: 'crust', icon_image: '/assets/herb-crust.png', brush_image: '/assets/herb-crust.png', price: 1.99},
	{ name: 'Pizza Sauce', ingredient_type: 'sauce', icon_image: '/assets/pizza-sauce.jpg', brush_image: '', price: 1.99},
	{ name: 'Pesto', ingredient_type: 'sauce', icon_image: '/assets/pesto.jpg', brush_image: '', price: 1.99},
	{ name: 'BBQ Sauce', ingredient_type: 'sauce', icon_image: '/assets/bbq-sauce.jpg', brush_image: '', price: 1.99},
	{ name: 'Hot Sauce', ingredient_type: 'sauce', icon_image: '/assets/hot-sauce.jpg', brush_image: '', price: 1.99},
	{ name: 'Sour Cream', ingredient_type: 'sauce', icon_image: '/assets/sour-cream.jpg', brush_image: '', price: 1.99},
	{ name: 'Pepperoni', ingredient_type: 'topping', icon_image: '/assets/pepperoni.jpg', brush_image: '/assets/pepperoni-slice.png', price: 0.25},
	{ name: 'Sausage', ingredient_type: 'topping', icon_image: '/assets/sausage.jpg', brush_image: '/assets/sausage-pieces.png', price: 0.25},
	{ name: 'Ham', ingredient_type: 'topping', icon_image: '/assets/ham.jpg', brush_image: '/assets/ham-slice.png', price: 0.25},
	{ name: 'Tomato', ingredient_type: 'topping', icon_image: '/assets/tomato.jpg', brush_image: '/assets/tomato-slice.png', price: 0.25},
	{ name: 'Onions', ingredient_type: 'topping', icon_image: '/assets/red-onion.jpg', brush_image: '/assets/onion-slice.png', price: 0.25},
	{ name: 'Mushrooms', ingredient_type: 'topping', icon_image: '/assets/mushrooms.jpg', brush_image: '/assets/mushroom-slice.png', price: 0.25},
	{ name: 'Black Olives', ingredient_type: 'topping', icon_image: '/assets/black-olives.jpg', brush_image: '/assets/olive-slices.png', price: 0.25},
	{ name: 'Basil', ingredient_type: 'topping', icon_image: '/assets/basil.jpg', brush_image: '/assets/basil-leaf.png', price: 0.25},
	{ name: 'Spinach', ingredient_type: 'topping', icon_image: '/assets/spinach.jpg', brush_image: '/assets/spinach-leaves.png', price: 0.25},
	{ name: 'Pineapple', ingredient_type: 'topping', icon_image: '/assets/pineapple_slices.png', brush_image: '/assets/pineapple-piece.png', price: 0.25}
])