<template>
    <header>
        <div class="menu">
            <div class="menu-item">File</div>
            <div class="menu-item">Edit</div>
            <div class="menu-item">Selection</div>
            <div class="menu-item">View</div>
            <div class="menu-item">Go</div>
            <div class="menu-item">Help</div>
        </div>
    </header>
</template>

<script>

</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: rgb(28, 32, 34);
    border-bottom: 2px solid rgb(17, 21, 24);
    font-weight: 400;
    font-size: 1.2rem;
    color: rgb(204, 204, 204);
}

header .menu {
    display: flex;
    align-items: center;
    height: 100%;
}

header .menu .menu-item {
    padding: 4px 12px;
    color: #cccccc;
    cursor: pointer;
    border-radius: 2px;
    font-size: 0.875rem;
}
</style>