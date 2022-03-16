Hooks.once('init', async function () {
    console.log("Augmented Initiative | Ready!")
});

Hooks.once('ready', async function () {
    console.log("Augmented Initiative | Ready!")
});

Hooks.on("renderCombatTracker", async (app, html, data) => {
    let combatantsDOM = html[0].querySelectorAll("li.combatant");
    let combatants = game.combat.combatants;
    combatantsDOM.forEach(el => {
        const actorData = getCombatantActorData(combatants.get(el.dataset.combatantId).data.actorId);
        let html =
            `<div class=\"token-stats\">
                <div class="token-stats-hp mdi mdi-heart-outline">${actorData.hp}</div>
                <div class="token-stats-structure cci cci-structure">${actorData.structure}</div>
                <div class="token-stats-heat cci cci-heat">${actorData.heat}</div>
                <div class="token-stats-stress cci cci-reactor">${actorData.stress}</div>
            </div>`;

        el.querySelector("div.token-initiative").before($.parseHTML(html)[0]);
    });
    combatantsDOM.forEach(el => console.log("AUG | " + JSON.stringify(
        getCombatantActorData(combatants.get(el.dataset.combatantId).data.actorId).hp))
    );
});

function getCombatantActorData(actorId) {
    return game.actors.get(actorId).data.data;
}

//Need to fetch the data for each combatant in the combat tracker, then display it next to the clickable
//then we can worry about making it a formapplication or whatever

//So step 1:
//Identify each initiative element so we can iter over them CHECK

//Step 2:
//Inject character data in there CHECK, WE GOT DATA

//Step 3?:
//Make the field pretty, editable, whatever
