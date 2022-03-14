Hooks.once('init', async function () {
    console.log("Augmented Initiative | Ready!")
});

Hooks.once('ready', async function () {
    console.log("Augmented Initiative | Ready!")
});

Hooks.on("renderCombatTracker", async (app, html, data) => {
    html[0].querySelectorAll("li.combatant div.token-initiative").forEach(el => el.before("TEST"));
});

class AugmentedInitiative {
    static TEMPLATES = {
        TODOLIST: `modules/${this.ID}/templates/initiative.hbs`
    }
}

//Need to fetch the data for each combatant in the combat tracker, then display it next to the clickable
//then we can worry about making it a formapplication or whatever

//So step 1:
//Identify each initiative element so we can iter over them

//Step 2:
//Inject character data in there

//Step 3?:
//Make the field pretty, editable, whatever
