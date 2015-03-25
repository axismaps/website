require 'csv'

CSV.foreach( File.expand_path( File.join( File.dirname( __FILE__ ), "clients.csv" ) ) ) do |row|
	Client.create(
		:id => row[ 0 ],
		:name => row[ 1 ],
		:name_short => row[ 2 ]
	)
end

CSV.foreach( File.expand_path( File.join( File.dirname( __FILE__ ), "projects.csv" ) ) ) do |row|
	Project.create(
		:record => row[ 0 ],
		:title => row[ 1 ],
		:title_short => row[ 2 ],
		:client_id => row[ 3 ],
		:tag => row[ 4 ],
		:date => row[ 5 ],
		:featured => row[ 6 ],
		:slideshow => row[ 7 ],
		:url => row[ 8 ]
	)
end
