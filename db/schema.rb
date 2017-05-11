# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161117211005) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "arbitrations", force: :cascade do |t|
    t.integer  "task_id"
    t.string   "farmer"
    t.string   "officer"
    t.string   "tobacco"
    t.string   "baking_team"
    t.string   "farmer_rep"
    t.decimal  "issue_weight",      precision: 8, scale: 2, default: 0.0
    t.decimal  "compensate_per_kg", precision: 8, scale: 2, default: 0.0
    t.datetime "created_at",                                              null: false
    t.datetime "updated_at",                                              null: false
    t.string   "reason"
  end

  create_table "cities", force: :cascade do |t|
    t.string   "title"
    t.string   "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contracts", force: :cascade do |t|
    t.integer  "task_id"
    t.string   "uuid"
    t.decimal  "amount",            precision: 8, scale: 2
    t.string   "party_a"
    t.string   "party_b"
    t.integer  "need_days",                                 default: 0
    t.decimal  "price",             precision: 8, scale: 2
    t.date     "contract_started"
    t.date     "contract_finished"
    t.date     "work_started"
    t.date     "work_finished"
    t.string   "workplace"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
  end

  create_table "counties", force: :cascade do |t|
    t.string   "title"
    t.string   "code"
    t.integer  "city_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dry_details", force: :cascade do |t|
    t.integer  "dry_tobacco_id"
    t.decimal  "amount_weight",      precision: 8, scale: 2
    t.integer  "amount_leafs",                               default: 0
    t.integer  "leafs_zz",                                   default: 0
    t.decimal  "weight_zz",          precision: 8, scale: 2
    t.decimal  "weight_wq",          precision: 8, scale: 2
    t.integer  "leafs_wq",                                   default: 0
    t.integer  "leafs_q",                                    default: 0
    t.decimal  "weight_q",           precision: 8, scale: 2
    t.decimal  "weight_zs",          precision: 8, scale: 2
    t.integer  "leafs_zs",                                   default: 0
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "dry_images", force: :cascade do |t|
    t.integer  "dry_tobacco_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "dry_tobaccos", force: :cascade do |t|
    t.integer  "task_id"
    t.decimal  "weight",             precision: 8, scale: 2
    t.boolean  "has_issue"
    t.string   "issue",                                      default: ""
    t.datetime "created_at",                                              null: false
    t.datetime "updated_at",                                              null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "fresh_details", force: :cascade do |t|
    t.integer  "fresh_tobacco_id"
    t.integer  "type_id"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "leafs_of_immature",    default: 0
    t.integer  "leafs_of_mature",      default: 0
    t.integer  "leafs_of_over_mature", default: 0
  end

  create_table "fresh_images", force: :cascade do |t|
    t.integer  "fresh_tobacco_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "fresh_tobaccos", force: :cascade do |t|
    t.integer  "task_id"
    t.string   "breed"
    t.string   "part"
    t.string   "quality"
    t.string   "tobacco_type"
    t.string   "water_content"
    t.datetime "created_at",                                                  null: false
    t.datetime "updated_at",                                                  null: false
    t.integer  "leafs_of_immature",                             default: 0
    t.integer  "leafs_of_mature",                               default: 0
    t.integer  "leafs_of_over_mature",                          default: 0
    t.decimal  "weight_of_immature",    precision: 8, scale: 2, default: 0.0
    t.decimal  "weight_of_mature",      precision: 8, scale: 2, default: 0.0
    t.decimal  "weight_of_over_mature", precision: 8, scale: 2, default: 0.0
    t.string   "uuid"
    t.string   "farmer_name"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "gradings", force: :cascade do |t|
    t.integer  "task_id"
    t.decimal  "XF",         precision: 8, scale: 2, default: 0.0
    t.decimal  "XL",         precision: 8, scale: 2, default: 0.0
    t.decimal  "XV",         precision: 8, scale: 2, default: 0.0
    t.decimal  "CF",         precision: 8, scale: 2, default: 0.0
    t.decimal  "CL",         precision: 8, scale: 2, default: 0.0
    t.decimal  "CV",         precision: 8, scale: 2, default: 0.0
    t.decimal  "BF",         precision: 8, scale: 2, default: 0.0
    t.decimal  "BL",         precision: 8, scale: 2, default: 0.0
    t.decimal  "BR",         precision: 8, scale: 2, default: 0.0
    t.decimal  "BV",         precision: 8, scale: 2, default: 0.0
    t.decimal  "BK",         precision: 8, scale: 2, default: 0.0
    t.decimal  "CFK",        precision: 8, scale: 2, default: 0.0
    t.decimal  "GY",         precision: 8, scale: 2, default: 0.0
    t.decimal  "no_level",   precision: 8, scale: 2, default: 0.0
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
  end

  create_table "middlewares", force: :cascade do |t|
    t.string   "mid"
    t.integer  "station_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "packing_images", force: :cascade do |t|
    t.integer  "packing_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "packings", force: :cascade do |t|
    t.integer  "task_id"
    t.string   "category"
    t.string   "average_weight"
    t.string   "category_state"
    t.integer  "packing_amount", default: 0
    t.string   "packing_type"
    t.string   "rod_uniformity"
    t.string   "uniformity"
    t.string   "packing_other"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "room_statuses", force: :cascade do |t|
    t.integer  "task_id"
    t.string   "ac"
    t.string   "fan"
    t.string   "air_inlet"
    t.string   "blower"
    t.string   "heating"
    t.string   "kettle"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "other",      default: ""
  end

  create_table "rooms", force: :cascade do |t|
    t.string   "room_no"
    t.integer  "station_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "address"
    t.boolean  "status",     default: true
  end

  create_table "standard_data", force: :cascade do |t|
    t.string   "code"
    t.integer  "using_rooms"
    t.integer  "total_bake_num"
    t.decimal  "fresh_weight",            precision: 13, scale: 6
    t.decimal  "dry_weight",              precision: 13, scale: 6
    t.integer  "d_rooms"
    t.integer  "d_poles_per_room"
    t.decimal  "d_fresh_weight_per_pole", precision: 13, scale: 6
    t.decimal  "d_dry_weight_per_pole",   precision: 13, scale: 6
    t.decimal  "d_scale",                 precision: 13, scale: 6
    t.decimal  "d_fresh_weight",          precision: 13, scale: 6
    t.decimal  "d_dry_weight",            precision: 13, scale: 6
    t.integer  "m_rooms"
    t.integer  "m_poles_per_room"
    t.decimal  "m_fresh_weight_per_pole", precision: 13, scale: 6
    t.decimal  "m_dry_weight_per_pole",   precision: 13, scale: 6
    t.decimal  "m_scale",                 precision: 13, scale: 6
    t.decimal  "m_fresh_weight",          precision: 13, scale: 6
    t.decimal  "m_dry_weight",            precision: 13, scale: 6
    t.integer  "u_rooms"
    t.integer  "u_poles_per_room"
    t.decimal  "u_fresh_weight_per_pole", precision: 13, scale: 6
    t.decimal  "u_dry_weight_per_pole",   precision: 13, scale: 6
    t.decimal  "u_scale",                 precision: 13, scale: 6
    t.decimal  "u_fresh_weight",          precision: 13, scale: 6
    t.decimal  "u_dry_weight",            precision: 13, scale: 6
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
  end

  create_table "stations", force: :cascade do |t|
    t.string   "title"
    t.string   "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "county_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "room_id"
    t.string   "task_number"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "step"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "hashed_password"
    t.string   "role"
    t.string   "salt"
    t.string   "phone"
    t.string   "token"
    t.integer  "station_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "code"
  end

  create_table "versions", force: :cascade do |t|
    t.string   "version_name"
    t.integer  "version_number"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

end
