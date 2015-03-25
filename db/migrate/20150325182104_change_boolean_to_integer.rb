class ChangeBooleanToInteger < ActiveRecord::Migration
  def change
    change_column :projects, :featured, :integer
    change_column :projects, :slideshow, :integer
  end
end
