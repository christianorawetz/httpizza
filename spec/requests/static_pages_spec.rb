require 'spec_helper'

describe "StaticPages" do
	subject { page }
	
	describe "Home page" do

		before { visit root_path }

		it { should have_selector('h1', text: 'Welcome to the HTTPizza App!') }
		it { should have_selector('title', text: 'HTTPizza') }
		it { should_not have_selector('title', text: '| Home') }
	end

	describe "About page" do
		before { visit about_path }

		it { should have_selector('h1', text: 'About') }
		it { should have_selector('title', text: '| About') }
	end

	describe "Contact page" do
		before { visit contact_path }

		it { should have_selector('h1', text: 'Contact') }
		it { should have_selector('title', text: '| Contact') }
	end
end
