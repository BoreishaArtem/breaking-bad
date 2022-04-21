<template>
    <div class="timeline-scroller">
        <ul class="timeline">
            <div class="timeline-line"></div>
            <li v-for="(event,date) in timeline" class="timeline-event">
                <span class="timeline-event-date">{{ date }}</span>
                <div v-if="typeof event === 'object'" class="timeline-event-info">
                    <p>
                        <span>Series: </span>
                        {{ event.series?.title }}
                    </p>

                    <p>
                        <span>Characters: </span>
                        {{ event.series?.characters.join(', ') }}
                    </p>

                    <div v-if="event.kills?.length > 0">
                        <span class="text-bold">{{ event.kills?.length > 0 ? 'Kills' : 'Kill' }}: </span>
                        <div class="kill-info" v-for="kill in event.kills" :key="kill.death_id">
                            <p>
                                <span class="text-bold">Death: </span>
                                {{ kill.death }}
                            </p>
                            <p>
                                <span class="text-bold">Last words: </span>
                                "{{ kill.last_words }}"
                            </p>
                            <p>
                                <span class="text-bold">Responsible: </span>
                                {{ kill.responsible }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else class="timeline-event-info">{{ event }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CharacterTimeLine",
    props: {
        timeline: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
.timeline {
    margin-top: 50px;
    position: relative;
    font-size: 14px;
    padding-left: 20px;
}

.timeline:after, .timeline:before {
    content: "";
    position: absolute;
    left: 0;
    height: 2px;
    width: 10px;
    transform: translateX(-35%);
    background: red;
}

.timeline:after {
    bottom: 0;
}
.timeline:before {
    top: 0;
}

.timeline-line {
    position: absolute;
    top: 0;
    left: 0;
    background: red;
    height: 100%;
    width: 2px;
}

.timeline-event {
    cursor: pointer;
    position: relative;
    margin-bottom: 20px;
}

.timeline-scroller {
    height: 100%;
    max-height: 400px;
    overflow: scroll;
    padding-left: 10px;
}

.timeline-event:after {
    content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(-135%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
}

.timeline-event:hover .timeline-event-info {
    opacity: 1;
}

.timeline-event-info {
    opacity: 0;
    position: absolute;
    right: 0;
    width: 200px;
}

.kill-info > p:first-child {
    font-weight: 600;
}

.timeline-event-info p > span {
    font-weight: 600;
}
</style>