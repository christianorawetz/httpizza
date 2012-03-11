require 'spec_helper'

describe "OrderPages" do

	subject { page }
	
	describe "Crust page" do
		before { visit order_pages_crust_path }

		it { should have_selector('h1', text: 'Pick a crust') }
		it { should have_selector('title', text: 'HTTPizza | Pick a crust') }
	end

	describe "Sauce page" do
		before { visit order_pages_sauce_path}

		it { should have_selector('h1', text: 'Pick a sauce') }
		it { should have_selector('title', text: 'HTTPizza | Pick a sauce')}
	end

	describe "Cheese page" do
		before { visit order_pages_cheese_path }

		it { should have_selector('h1', text: 'Pick a cheese')}
		it { should have_selector('title', text: 'HTTPizza | Pick a cheese')}
	end

	describe "Toppings page" do 
		before { visit order_pages_toppings_path }

		it { should have_selector('h1', text: 'Add toppings') }
		it { should have_selector('title', text: 'HTTPizza | Add toppings') }
	end

	describe "Delivery page" do 
		before { visit order_pages_delivery_path }

		it { should have_selector('h1', text: 'Delivery Information') }
		it { should have_selector('title', text: 'HTTPizza | Delivery Information') }
	end

	describe "Checkout page" do
		before { visit order_pages_checkout_path }
		
		it { should have_selector('h1', text: 'Checkout') }
		it { should have_selector('title', text: 'HTTPizza | Checkout' )}
	end
end
