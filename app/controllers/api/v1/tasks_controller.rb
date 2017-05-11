module Api
	module V1
		class TasksController < ApiController

			# Dispatch a task when binding room successfully
			def create
				room = Room.find_by_station_id_and_address(params[:station_id], params[:address])
				if room
				  return render json: Task.dispatch(current_user, room)

				end
				render json: { code: 400, msg: 'Can not found address'}
			end

			def unbound
				task = Task.find_by_task_number(params[:task_no])
				if task
				  return render json: task.unbound
				end
				render json: {code: 404, error: 'Can not find task'}
			end

			def show
				task = Task.find_by_task_number(params[:task_no])
				if task
					res = task.task_by_step(params[:step])
					return render json: { code: 200, task: res } if res
				end
				render json: { code: 404, msg: "can not find task #{params[:task_no]}" }
			end

			def finished_tasks
				sql = "select t.id as task_id, r.address, d.issue, t.created_at, t.step 
				       from dry_tobaccos d left join tasks t on t.id = d.task_id
               left join rooms r on r.id = t.room_id where t.user_id =#{current_user.id};"

        res = ActiveRecord::Base.connection.execute(sql)
				render json: { code: 200, tasks: res }
			end

			def list_task
				sql = "select * from tasks t , rooms r where t.room_id = r.id;"

        res = ActiveRecord::Base.connection.execute(sql)
				render json: { code: 200, tasks: res }
			end

			def syn_tasks
				sql = "select t.*, r.address from tasks t, rooms r
								where r.id = t.room_id and
								t.user_id = #{params[:user_id]}
								and r.status = false and t.step < 6;"
				res = ActiveRecord::Base.connection.execute(sql)
				render json: { code: 200, tasks: res }
			end

			def update
				task = Task.find_by_task_number(params[:task_no])
				if task
					#task.update_attributes(step: task.step + 1)
          task.update_attributes(step: 5)
					return render json: {code: 200, task: task} 
				end
				render json: { code: 404, error: "Can not find task #{params[:task_no]}"}
			end

			def devices
				sql = "select distinct r.address from rooms r , tasks t where t.user_id = #{current_user.id}
				       and r.id = t.room_id and t.step = 5"

				res = ActiveRecord::Base.connection.execute(sql)
				addresses = []
				res.each do |address|
					addresses << address["address"]
				end
				render json: { code: 200, addresses: addresses, mid: current_user.station.code }
			end

		end
	end
end
