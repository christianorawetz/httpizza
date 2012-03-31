class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.string :name
      t.string :ingredient_type
      t.string :icon_image
      t.string :brush_image
      t.decimal :price

      t.timestamps
    end
  end
end
