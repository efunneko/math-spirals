import {jst}       from 'jayesstee';
import {jstform}   from 'jayesstee.form';
import {Block}     from './block.js';

export class App extends jst.Object {
  constructor() {
    super();

    this.DELAY        = 400;
    
    this.BLOCK_WIDTH  = 20;
    this.BLOCK_HEIGHT = 20;

    this.WINDOW_WIDTH  = window.innerWidth;
    this.WINDOW_HEIGHT = window.innerHeight;

    this.numbers = [7,4,9,5,6];
    this.colors  = ["red", "blue", "green", "orange"];
    
    this.blocks = [];
    this.count = 0;
    this.x = 0;
    this.y = 0;

    this.iterations = 5;

    this.timer = window.setInterval(e => {
      if (this.count >= 4 * this.iterations) {
        window.clearInterval(this.timer);
      }
      else {
        this.addLine();
      }
    }, this.DELAY);

    let inputs = [];
    for (let numIdx = 0; numIdx < 5; numIdx++) {
      let input = {
        type: "select",
        label: `Number ${numIdx + 1}`,
        name: numIdx,
        events: {
          change: e => this.change(e)
        },
        items: [],
        css: {input$c: {display: 'inline-block', fontSize$px: 12}}
      };
      for (let val = 1; val < 10; val++) {
        input.items.push({name: val, selected: val === this.numbers[numIdx]});
      }
      inputs.push(input);
    }

    /* ToDo - consider adding more iterations, with variable rotation for each...
    let input = {
      type: "select",
      label: `Iterations`,
      name: "iterations",
      events: {
        change: e => this.change(e)
      },
      items: [],
      css: {input$c: {display: 'inline-block', fontSize$px: 12}}
    };
    
    for (let val = 3; val < 9; val++) {
      input.items.push({name: val, selected: val === 4});
    }

    inputs.push(input);
    */
    
    this.form = jstform.$form({
      inputs: inputs
    });

    
  }
  
  cssGlobal() {
    return {
      body: {
        fontFamily:      "'Roboto Slab', serif",
        fontSize$pt:     16,
        backgroundColor: "white",
        margin$px:       0,
        padding$px:      0
      },
    };
  }
  
  render() {
    return jst.$div(
      {id: "app"},
      this.form,
      this.blocks
    );
  }

  change() {
    let vals = this.form.getValues();

    this.count  = 0;
    this.x      = 0;
    this.y      = 0;
    this.blocks = [];

    this.numbers = [];
    for (let idx = 0; idx < 5; idx++) {
      this.numbers[idx] = parseInt(vals[idx]);
    }
    
    this.refresh();
    
    console.log("Vals", vals);
  }

  addLine() {
    let number = this.numbers[this.count % 5];
    let color  = this.colors[this.count % 4];
    this.blocks.push(new Block(this, {
      x: this.x,
      y: this.y,
      length: number,
      dir: this.count%4,
      color: color
    }));
    
    this.refresh();

    let movement = [[1,0],[0,1],[-1,0],[0,-1]][this.count % 4];
    
    this.x += movement[0] * number;
    this.y += movement[1] * number;
    
    this.count++;
    
  }
  
    
}
