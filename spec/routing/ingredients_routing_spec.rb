require "spec_helper"

describe IngredientsController do
  describe "routing" do

    it "routes to #index" do
      get("/ingredients").should route_to("ingredients#index")
    end

  end
end
