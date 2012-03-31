require 'spec_helper'

describe "ingredients/edit" do
  before(:each) do
    @ingredient = assign(:ingredient, stub_model(Ingredient,
      :name => "MyString",
      :type => "",
      :icon_image => "MyString",
      :brush_image => "MyString",
      :price => "9.99"
    ))
  end

  it "renders the edit ingredient form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => ingredients_path(@ingredient), :method => "post" do
      assert_select "input#ingredient_name", :name => "ingredient[name]"
      assert_select "input#ingredient_type", :name => "ingredient[type]"
      assert_select "input#ingredient_icon_image", :name => "ingredient[icon_image]"
      assert_select "input#ingredient_brush_image", :name => "ingredient[brush_image]"
      assert_select "input#ingredient_price", :name => "ingredient[price]"
    end
  end
end
