class HomeController < ApplicationController
  def index
    @slides = Project.select( "record, IFNULL( title_short, title ) AS title" ).where( slideshow: 1 )
  end
end
