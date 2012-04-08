class FixPriceType < ActiveRecord::Migration
  def change
  	change_column :ingredients, :price, :decimal, :precision => 8, :scale => 2
  end

end
