require 'spec_helper'

describe "OrderPages" do
	describe "Home page" do
		it "should have the header 'HTTPizza'" do
			visit '/order_pages/home'
			page.should have_selector('h1', :text => 'HTTPizza')
		end

		it "should have the right title" do 
			visit '/order_pages/home'
			page.should have_selector('title',
									  :text => "HTTPizza")
		end

		it "should not have a custom page title" do
			visit '/order_pages/home'
			page.should_not have_selector('title', :text => '| Home')
		end
	end

	describe "Crust page" do
		it "should have the header 'Pick a crust'" do 
			visit '/order_pages/crust'
			page.should have_selector('h1', :text => 'Pick a crust')
		end

		it "should have the right title" do
			visit '/order_pages/crust'
			page.should have_selector('title',
									  :text => "HTTPizza | Pick a crust")
		end
	end

	describe "Sauce page" do
		it "should have the header 'Pick a sauce'" do
			visit '/order_pages/sauce'
			page.should have_selector('h1', :text => 'Pick a sauce')
		end

		it "should have the right title" do
			visit '/order_pages/sauce'
			page.should have_selector('title',
									  :text => "HTTPizza | Pick a sauce")
		end
	end

	describe "Cheese page" do
		it "should have the header 'Pick a cheese'" do
			visit '/order_pages/cheese'
			page.should have_selector('h1', :text => 'Pick a cheese')
		end

		it "should have the right title" do
			visit '/order_pages/cheese'
			page.should have_selector('title',
									  :text => "HTTPizza | Pick a cheese")
		end
	end

	describe "Toppings page" do 
		it "should have the header 'Add toppings'" do
			visit '/order_pages/toppings'
			page.should have_selector('h1', :text => 'Add toppings')
		end

		it "should have the right title" do
			visit '/order_pages/toppings'
			page.should have_selector('title',
									  :text => "HTTPizza | Add toppings")
		end		
	end

	describe "Delivery page" do 
		it "should have the header 'Delivery Information'" do
			visit '/order_pages/delivery'
			page.should have_selector('h1', :text => 'Delivery Information')
		end

		it "should have the right title" do
			visit '/order_pages/delivery'
			page.should have_selector('title',
									  :text => "HTTPizza | Delivery Information")
		end
	end

	describe "Checkout page" do
		it "should have the header 'Checkout'" do
			visit '/order_pages/checkout'
			page.should have_selector('h1', :text => 'Checkout')
		end

		it "should have the right title" do
			visit '/order_pages/checkout'
			page.should have_selector('title',
									  :text => "HTTPizza | Checkout")
		end
	end
end
