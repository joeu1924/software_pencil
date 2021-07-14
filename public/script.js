
const socket = io('/')
//Logica para poder acceder al video y al audio


const videoGrid = document.getElementById('video-grid') //llamando al elemento del html

const myPeer = new Peer(undefined, {
    path: '/peerjs',
    host: '/', //cualquiera q sea el host funcionara
    port: '3060' //se va a cambiar cuando se trate de subir al heroku
  })


let myVideoStream; //variable global y se pueda acceder a ella
const myVideo = document.createElement('video') //variable para poder crear el video en el html
myVideo.muted = true; //poder mutear el video 
const peers = {}
//GetUser Media para poder tener controll del audio y del video
navigator.mediaDevices.getUserMedia({
  video: true, //para ponerlo como prendido
  audio: true  //para ponerlo como prendido  
    }).then(stream => {  //cuando el usuario accede a darte acceso al video y al audio
    myVideoStream = stream;    
    addVideoStream(myVideo, stream);    
    
    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
        })
    })
    
    socket.on('user-connected', userId => { 
             
      connectToNewUser(userId, stream)
        
    })
    // input value
    let text = $("input");
    // when press enter send message
    $('html').keydown(function (e) {
        if (e.which == 13 && text.val().length !== 0) {
        socket.emit('message', text.val());
        text.val('')
        }
    });
    //Logica para q puedan mandar mensajes que los va almacenar en las listas 
        socket.on("createMessage", message => {
        $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
        scrollToBottom() //funcino de desplazamiento
    })
})



socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
  })
  
myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)  //sacamos la info de la sala a la q nos vamos a reunir del html en su cabecera
  })


//Funcion para poder conectarse al usuario
function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
  
    peers[userId] = call
    
  }
  




//Funcion que servira para que pueda funcionar el videStreaming
function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play() //una ves que toda la data se cargue se va a poder empezar el videoStream
    })
    videoGrid.append(video) //aca se le juntara al video grid nuestro video
  }





//constante para poder desplazarse a traves de los mensajes
const scrollToBottom = () => {
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
  }
  
  
//poner en mudo el boton
const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled; //hacer constante que se permite el audio
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false; //si no esta en mudo se ponen mudo
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true; // si esta en mudo se quita el mudo
    }
  }
  
const playStop = () => {
    
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
      setPlayVideo()
    } else {
      setStopVideo()
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }


const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html; //ver que esta clase esta agregada al boton para q fuciones
  }
  
const setUnmuteButton = () => {
    const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;//ver que esta clase esta agregada al boton para q fuciones
  }
  
const setStopVideo = () => {
    const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;//ver que esta clase esta agregada al boton para q fuciones
  }
  
const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
  }


  