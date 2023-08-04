class AddBakedToCookies < ActiveRecord::Migration[7.0]
  def change
    add_column :cookies, :baked, :boolean, default: false
  end
end
