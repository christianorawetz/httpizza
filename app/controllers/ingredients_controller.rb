class IngredientsController < ApplicationController
  caches_page :index
  
  # GET /ingredients
  # GET /ingredients.json
  def index
    @ingredients = Ingredient.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @ingredients }
    end
  end

end
