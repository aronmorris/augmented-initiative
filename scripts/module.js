Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {
    console.log("Augmented Initiative | Ready!")
});

class AugmentedInitiative {
    static TEMPLATES = {
        TODOLIST: `modules/${this.ID}/templates/initiative.hbs`
      }
}