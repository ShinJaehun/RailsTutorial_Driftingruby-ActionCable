import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

// Connects to data-controller="vote"
export default class extends Controller {
  static targets = ["radio"]

  connect() {
    this.channel = consumer.subscriptions.create({
      // channel: "ChatChannel", chat_message_id: this.data.get("messageid")
      channel: "VoteChannel"
    }, {
      connected: this._cableConnected.bind(this),
      disconnected: this._cableDisconnected.bind(this),
      received: this._cableReceived.bind(this),
      voted: this.voted.bind(this),
      // reduce: this.reduce(this),
      // selectRadioOption: this.selectRadioOption(this),
    })
  }

  _cableConnected(){
    console.log('_cableConnected')
    // console.log(this.radioTarget.value)
    // this.voted("hello") // 뭔가 전달이 되는 거 같은디...
    // document.getElementById("btn").addEventListener('click', function() {
    //     this.App.vote.voted("hello world");
    //     // ActionCable.server.broadcast ("vote", { power: "absolute power~" });
    // })
    // const radios = document.querySelectorAll('input[type=radio]')
    // radios.forEach((e) => e.addEventListener('change', function() {
      // console.log(this.value)
      // this.voted(this.value)

      // consumer.voted(this.value)
      // this.channel.voted(this.value)
      
    // }))
    // this.voted("이건 잘되니?")

    console.log(this.channel)
    console.log(this.radioTarget)
    const radios = document.querySelectorAll('input[type=radio]')
    // radios.forEach((element, key) => {
    //   // e.preventDefault()
    //   element.addEventListener('change', function(e) {
    //   // this.voted('voted', { power: this.value })
    //   // this.voted(this.value)
    //   console.log(e)
    //   // Event {isTrusted: true, type: 'change', target: input#vote_power_telekenisis.radio_buttons.required, currentTarget: input#vote_power_telekenisis.radio_buttons.required, eventPhase: 2, …}
    //   console.log(element) 
    //   // <input data-vote-target="radio" class="radio_buttons required" required="required" aria-required="true" type="radio" value="flying" name="vote[power]" id="vote_power_flying"> 
    //   console.log(key) // 0, 1, 2, 3..
    //   console.log(this.value) // telekenisis, flying, ...
    //   e.preventDefault()
    //   console.log(this)
    //   // this.voted.bind(this.value);
    //   // this.channel.perform('voted', { power: this.value })
    //   // App.vote.voted(this.value) // error
    //   // this.consumer.voted(this.value)
    //   // console.log(this.consumer)
    //   // console.log(consumer)
    // })})
    var clicks = new Array()

    radios.forEach((element, k) => {
      // 자바스크립트에서 이 차이에 대해서 알아내는 게 무엇보다 중요합니다...
      // element.addEventListener('change', this.voted(this.value))
      // element.addEventListener('change', function(){
      //   this.voted(this.value)
      // })
      // 어쨌든 얘는 성공!!
      // console.log(this.value)

      // element.addEventListener('change', () => this.voted(this.value))
      element.addEventListener('change', () => { 
        // console.log(element.value)
        clicks.push(element.value)
        // console.log(clicks)
        this.voted(element.value)

        console.log(clicks[clicks.length-2])
        this.reduced(clicks[clicks.length-2])
      })
    })
  }

  _cableDisconnected(){
    console.log('_cableDisconnected')
  }

  _cableReceived(data){
    // console.log("vote channel connect!")
    // console.log(data)
    // console.log('_cableReceived????')

    // console.log(data)
    var power = data['power']
    console.log(power)

    var count = parseInt(document.querySelector(`.${power} .count .progress .progress-bar`).textContent)

    // var count = parseInt(document.querySelector(`.${power} .count .progress .progress-bar`).style.width)
    // console.log(count)

    // var count = parseInt($('.'+power+' .count').text())
    
    if(data['method']=='add'){
      console.log("더하기!")
      
      document.querySelector(`.results .${power} .count .progress-bar`).textContent = count + 1

      // document.querySelector(`.results .${power} .count .progress-bar`).style.width = count + 25 + '%'
      // result.textContent = count + 1
      // result.style.width = count + 25

    }else if(data['method']=='subtract'){
      console.log("빼기!")
      document.querySelector(`.results .${power} .count .progress-bar`).textContent = count - 1
    }

    var total_count = 0

    document.querySelectorAll(`.count .progress-bar`).forEach((e) => {
      total_count = total_count + parseInt(e.textContent)
    })

    document.querySelectorAll(`.count .progress-bar`).forEach((e) => {
      // e.css('width', parseInt(e.text) / total_count * 100 + '%')
      e.style.width = parseInt(e.textContent) / total_count * 100 + '%'
    })


    //   $('.results '+'.'+power+' .count .progress-bar').html(count+1)
    // }else if(data['method']=='subtract'){
    //   $('.results '+'.'+power+' .count .progress-bar').html(count-1)
    // }
    // var total_count=0
    // $('.count .progress-bar').each(function(){
    //   total_count=total_count+parseInt($(this).text())
    // })
    // $('.count .progress-bar').each(function(){
    //   $(this).css('width',parseInt($(this).text())/total_count*100+'%')
    // })
  }

  voted(power){
    // console.log(power)
    this.channel.perform('voted', { power: power })
    // this.channel.perform('voted', { power })
    
  }

  reduced(power){
    this.channel.perform('reduced', { power: power })
    // return this.perform('reduced', { power: power })
  }

  // selectRadioOption(data){
  //   console.log(this.radioTarget)
  // }
}
