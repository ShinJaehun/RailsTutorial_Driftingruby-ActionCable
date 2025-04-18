import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

// Connects to data-controller="chat"
export default class extends Controller {
  // static targets = ["user", "content", "messages"]
  static targets = ["content", "messages"]

  connect() {
    console.log("connect!")
    this.channel = consumer.subscriptions.create({
      // channel: "ChatChannel", chat_message_id: this.data.get("messageid")
      channel: "ChatChannel"

    }, {
      connected: this._cableConnected.bind(this),
      disconnected: this._cableDisconnected.bind(this),
      received: this._cableReceived.bind(this),
    })
  }

  _cableConnected(){
    console.log('_cableConnected')
  }

  _cableDisconnected(){
    console.log('_cableDisconnected')
  }

  _cableReceived(data){
    console.log(data)
    console.log('_cableReceived????')

    // this.contentsTarget.innerHTML = data.message;
    // this.messagesTarget.prepend(data.message)
    // <- 다시 이걸로 테스트 해보자(브라우저에서 검사하는 식으로 비교!)
    // 문제는 이 과정에서 HTML이 파싱되지 않고 그대로 코드를 출력해버린다는 거!
    this.messagesTarget.insertAdjacentHTML('afterBegin', data.message)
    
    // this.userTarget.value = ""
    this.contentTarget.value = ""
  }
}
