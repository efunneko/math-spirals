import {jst}       from 'jayesstee';
import {jstform}   from 'jayesstee.form';



export class Block extends jst.Object {
  constructor(app, opts) {
    super();

    this.app    = app;
    this.x      = opts.x;
    this.y      = opts.y;
    this.length = opts.length;
    this.dir    = opts.dir;
    this.color  = opts.color;


    
  }

  cssInstance() {
    return {
      block$c: {
        backgroundColor: this.color,
        opacity:         0.7,
        width$px:        this.app.BLOCK_WIDTH * this.length,
        height$px:       this.app.BLOCK_HEIGHT,
        position:        "fixed",
        top$px:          this.app.WINDOW_HEIGHT/2 + this.app.BLOCK_HEIGHT * this.y,
        left$px:         this.app.WINDOW_WIDTH/2 + this.app.BLOCK_WIDTH * this.x,
        transform:       jst.rotate(jst.deg(this.dir*90)),
        transformOrigin$px: [this.app.BLOCK_WIDTH/2, this.app.BLOCK_HEIGHT/2] 
      }
    };
  }

  render() {
    return jst.$div({cn: "--block"}, " ");
  }

}
