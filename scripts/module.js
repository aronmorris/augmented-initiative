Hooks.once('ready', async function () {
    console.log("Augmented Initiative | Ready!")
});

Hooks.on("updateActor", async () => {
    ui.combat.render();
})

Hooks.on("renderCombatTracker", async (app, html) => {
    if (!game.user?.isGM) return;

    let combatantsDOM = html[0].querySelectorAll("li.combatant");
    combatantsDOM.forEach(el => {
        const actorData = getCombatantActorData(el.dataset.combatantId);
        el.querySelector("div.token-initiative").before(
            $.parseHTML(getReadyHtml(
                actorData.hp ?? 0,
                actorData.structure ?? 0,
                actorData.heat ?? 0,
                actorData.stress ?? 0)
            )[0]
        );
    });
});

function getCombatantActorData(combatantId) {
    return game.combat.combatants.get(combatantId).actor.data.data;
}

function getReadyHtml(hp, structure, heat, stress) {
    return `<div class="token-stats flex-center">
                <div class="token-stats-hp">
                    <i class="token-stats-icon mdi mdi-heart-outline"></i>
                    <span class="token-stats-text">${hp}</span>
                </div>
                <div class="token-stats-structure">
                    <i class="token-stats-icon cci cci-structure"></i>
                    <span class="token-stats-text">${structure}</span>
                </div>
                <div class="token-stats-heat">
                <i class="token-stats-icon cci cci-heat"></i>
                    <span class="token-stats-text">${heat}</span>
                </div>
                <div class="token-stats-stress">
                <i class="token-stats-icon cci cci-reactor"></i>
                    <span class="token-stats-text">${stress}</span>
                </div>
            </div>`;
}