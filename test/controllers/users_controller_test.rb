require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post :create, user: { address: @user.address, originization: @user.originization, phone_type: @user.phone_type, primary_email: @user.primary_email, primary_first_name: @user.primary_first_name, primary_last_name: @user.primary_last_name, primary_phone: @user.primary_phone, salutation: @user.salutation, secondary_email: @user.secondary_email, secondary_first_name: @user.secondary_first_name, secondary_last_name: @user.secondary_last_name, secondary_phone: @user.secondary_phone }
    end

    assert_redirected_to user_path(assigns(:user))
  end

  test "should show user" do
    get :show, id: @user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user
    assert_response :success
  end

  test "should update user" do
    patch :update, id: @user, user: { address: @user.address, originization: @user.originization, phone_type: @user.phone_type, primary_email: @user.primary_email, primary_first_name: @user.primary_first_name, primary_last_name: @user.primary_last_name, primary_phone: @user.primary_phone, salutation: @user.salutation, secondary_email: @user.secondary_email, secondary_first_name: @user.secondary_first_name, secondary_last_name: @user.secondary_last_name, secondary_phone: @user.secondary_phone }
    assert_redirected_to user_path(assigns(:user))
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete :destroy, id: @user
    end

    assert_redirected_to users_path
  end
end
