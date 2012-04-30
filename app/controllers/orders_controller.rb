class OrdersController < ApplicationController
  caches_page :makeline
  
  def create
  	respond_to do |format|
  		format.json { render json: params[:order], status: 201 }
  	end
  end

  def confirmation
  end

  def checkout
  end

  def makeline
  end
end
