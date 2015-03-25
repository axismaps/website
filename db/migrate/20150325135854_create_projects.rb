class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :record, null: false
      t.string :title, null: false
      t.string :tag
      t.date :date
      t.boolean :featured
      t.boolean :slideshow
      t.string :url
      t.timestamps
    end
  end
end
