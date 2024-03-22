import Matter, { Sleeping } from "matter-js";

const Physics = (entities, { touches, events, time }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      if (entities.Baddie.animOpitons.animType === "walk") {
        Matter.Body.applyForce(
          entities.Baddie.body,
          entities.Baddie.body.position,
          {
            x: 0.001,
            y: 0,
          }
        );
      }
      Matter.Body.setVelocity(entities.Baddie.body, {
        x: 0.4,
        y: 0.05,
      });
      entities.Baddie.animOpitons.animType = "walk"; // set the cycle to walk after pressing the screen.
      Sleeping.set(entities.Baddie.body, true);
    });

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    var objA = pairs[0].bodyA.label;
    var objB = pairs[0].bodyB.label;
console.log(objA + ' ' +objB)
    if (
      (objA === "Candle" && objB === "Baddie") || 
      (objA === "Baddie" && objB === "Candle")
      ) {
      console.log('collide')
      // entities.MonsterA.animOpitons.animType = "die";
      // entities.Candle1.animOpitons.animType = 'extinguish1';
      // Sleeping.set(entities.MonsterA.body, true);

      // setTimeout(() => {
      //   Matter.Composite.remove(engine.world, entities.Monster.body);
      //   entities.Monster.animOpitons.visibility = "none";
      // }, 10);


    }

    // if (
    //   (objA === "Candle2" && objB === "Baddie") 
    //   || (objA === "Baddie" && objB === "Candle2")
    //   ) {
    //   console.log('collide')

    //   // entities.Monster.animOpitons.animType = "die";
    //   // entities.Candle2.animOpitons.animType = 'extinguish1'
    //   // Sleeping.set(entities.Monster.body, true);

    //   // setTimeout(() => {
    //   //   Matter.Composite.remove(engine.world, entities.MonsterA.body);
    //   //   entities.Monster.animOpitons.visibility = "none";
    //   // }, 10);


    // }
  });
 Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
