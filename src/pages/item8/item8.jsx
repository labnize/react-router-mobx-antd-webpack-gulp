import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import audioSrc from 'media/tip.mp3';
import './item8.less';

class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
  }
  componentDidMount() {
    $('.play').bind('click', this.playAudio);
  }
  playAudio() {
    const media = $('#media')[0];
    if (media.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
  play() {
    const media = $('#media')[0];
    media.play();
    $('#play').html('Pause music!');
  }
  pause() {
    const media = $('#media')[0];
    media.pause();
    $('#play').html('Play music!');
  }
  render() {
    return (
      <Layout name="item8">
        <div className="item8">
          <div id="audioControl">
            <div className="play">
              <span id="play">Pause music!</span>
            </div>
          </div>
          <audio id="media" autoPlay="autoplay">
            <source src={audioSrc} />
          </audio>
        </div>
      </Layout>

    );
  }
}
export default PageComponent;
