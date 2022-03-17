Hooks.once('ready', async function () {
    console.log("Augmented Initiative | Ready!")
});

Hooks.on("updateActor", async (actor, data, options, userId) => {
    if (!game.user?.isGM) return;
    console.log("Augmented Initiative caught this updateActor event");
    if (game.combat && game.combat.isActive) {
        console.log("Ok, this works");
    }
})

Hooks.on("renderCombatTracker", async (app, html, data) => {
    if (!game.user?.isGM) return;

    let combatantsDOM = html[0].querySelectorAll("li.combatant");
    combatantsDOM.forEach(el => {
        const actorData = getCombatantActorData(el.dataset.combatantId);
        el.querySelector("div.token-initiative").before(
            $.parseHTML(getReadyHtml(actorData.hp, actorData.structure, actorData.heat, actorData.stress))[0]
        );
    });
});

function getCombatantActorData(combatantId) {
    return game.combat.combatants.get(combatantId).actor.data.data;
}

function getReadyHtml(hp, structure, heat, stress) {
    return `<div class="token-stats flex-center">
                <div class="token-stats-hp">
                    <i class="token-stats-text  mdi mdi-heart-outline"></i>
                    <span class="token-stats-text">${hp}</span>
                </div>
                <div class="token-stats-structure">
                    <i class="token-stats-text cci cci-structure"></i>
                    <span class="token-stats-text">${structure}</span>
                </div>
                <div class="token-stats-heat">
                <i class="token-stats-text cci cci-heat"></i>
                    <span class="token-stats-text">${heat}</span>
                </div>
                <div class="token-stats-stress">
                <i class="token-stats-text cci cci-reactor"></i>
                    <span class="token-stats-text">${stress}</span>
                </div>
            </div>`;
}

//Need to fetch the data for each combatant in the combat tracker, then display it next to the clickable
//then we can worry about making it a formapplication or whatever

//So step 1:
//Identify each initiative element so we can iter over them CHECK

//Step 2:
//Inject character data in there CHECK, WE GOT DATA

//Step 3:
//Make the field pretty. We need FONTS and to know WHERE THE ICONS COME FROM. Ask Eranziel.
