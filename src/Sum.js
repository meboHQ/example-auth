const Mebo = require('mebo');

@Mebo.grant('web', {auth: true, method: "get", restRoute: "/sum"})
@Mebo.register('sum')
class Sum  extends Mebo.Action{
  constructor(){
    super();
    this.createInput('a: numeric');
    this.createInput('b: numeric');
  }

  async _perform(data){
    return data.a + data.b;
  }
}

module.exports = Sum;
