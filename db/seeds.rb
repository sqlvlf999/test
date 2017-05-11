# stations = [
#   {title: '喻家坳', code: '4301240003', rooms: 6}
# ]


# stations.each do |station|
#   puts station
#   s = Station.create(title: station[:title], code: station[:code])
#   m = Middleware.create(mid: s.code, station_id: s.id)
#   puts m

#   station[:rooms].times do |i|
#     address = '00000'.slice(0, ('00000'.length - "#{i + 1}".length)) + "#{i + 1}"

#     r = Room.create(room_no: i + 1, address: address, station_id: s.id, status: true)
#     puts r
#   end
# end

Version.create(version_number: 21, version_name: '1.2.4.4')

# User.create([ 
#   {name: '433001', password: '123456',   phone: '433001', station_id: 26, role: 'O'},
#   {name: '433002', password: '123456',   phone: '433002', station_id: 26, role: 'O'},
#   {name: '433003', password: '123456',   phone: '433003', station_id: 26, role: 'O'},
#   {name: '433004', password: '123456',   phone: '433004', station_id: 26, role: 'O'},
#   {name: '433005', password: '123456',   phone: '433005', station_id: 26, role: 'O'},
#   {name: '433006', password: '123456',   phone: '433006', station_id: 26, role: 'O'}
# ])

  # (50...100).each do |i|
  #   address = '00000'.slice(0, ('00000'.length - "#{i + 1}".length)) + "#{i + 1}"

  #   r = Room.create(room_no: i + 1, address: address, station_id: 16, status: true)
  #   puts address
  # end



  





	
