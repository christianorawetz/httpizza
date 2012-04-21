require 'spec_helper'

describe "Orders" do

	subject { page }
	
	describe "Makeline page" do
		before { visit orders_makeline_path }

		it { should have_selector('h1', text: 'Pizza Makeline') }
		it { should have_selector('title', text: 'HTTPizza | Build a Pizza') }
		it { should have_selector('div#make-line') }
		it { should have_selector('div#ingredients-view') }
		it { should have_selector('div#pizza-view') }
		it { should have_selector('script#ingredients_template') }
		it { should have_selector('script#order_ticket_template') }
		it { should have_selector('div#order-ticket-view') }
	end
end
