class MessagesController < ApplicationController
  # before_action :set_message, only: %i[ show edit update destroy ]

  def create
    message = Message.create(params[:message].permit!)
    # puts params
    # puts message.id
    # ActionCable.server.broadcast "chat", {
    #   message: MessagesController.render(
    #     partial: "messages/message",
    #     locals: { message: message }
    #   ).squish
    # }
    # ActionCable.server.broadcast "chat", { message: render_message(message) }
    # ActionCable.server.broadcast "chat", { message: message.content }
    # 이렇게 하면 content만 나간다...
    
    head :ok
    # 이 오류 메시지는 더이상 나오지 않음! 'No template found for MessagesController#create, rendering head :no_content'

    # redirect_to root_path, notice: "Message was successfully updated."
    # debugger
  end

  private

  # def render_message(message)
    # ApplicationController.render(partial: 'messages/message', locals: {message: message}).squish <- 차이는 없는 듯함....
    # MessagesController.render(partial: 'messages/message', locals: {message: message}).squish
    # 결국 여기서는 제대로 rendering해서 보내주고 있었음...
  # end

  # # GET /messages or /messages.json
  # def index
  #   @messages = Message.all
  # end

  # # GET /messages/1 or /messages/1.json
  # def show
  # end

  # # GET /messages/new
  # def new
  #   @message = Message.new
  # end

  # # GET /messages/1/edit
  # def edit
  # end

  # # POST /messages or /messages.json
  # def create
  #   @message = Message.new(message_params)

  #   respond_to do |format|
  #     if @message.save
  #       format.html { redirect_to @message, notice: "Message was successfully created." }
  #       format.json { render :show, status: :created, location: @message }
  #     else
  #       format.html { render :new, status: :unprocessable_entity }
  #       format.json { render json: @message.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # PATCH/PUT /messages/1 or /messages/1.json
  # def update
  #   respond_to do |format|
  #     if @message.update(message_params)
  #       format.html { redirect_to @message, notice: "Message was successfully updated." }
  #       format.json { render :show, status: :ok, location: @message }
  #     else
  #       format.html { render :edit, status: :unprocessable_entity }
  #       format.json { render json: @message.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /messages/1 or /messages/1.json
  # def destroy
  #   @message.destroy!

  #   respond_to do |format|
  #     format.html { redirect_to messages_path, status: :see_other, notice: "Message was successfully destroyed." }
  #     format.json { head :no_content }
  #   end
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_message
  #     @message = Message.find(params[:id])
  #   end

  #   # Only allow a list of trusted parameters through.
  #   def message_params
  #     params.require(:message).permit(:user, :content)
  #   end
end
