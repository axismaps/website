class AddShortTitleToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :title_short, :string
  end
end
