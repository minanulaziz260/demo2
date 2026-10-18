/**
 * Invitation Controller - Wevitation Timeless Snapshot
 * Fully reconstructed and optimized for standalone deployment.
 */

$(document).ready(function () {
    // -------------------------------------------------------------
    // 1. Toastr notification default options
    // -------------------------------------------------------------
    if (typeof toastr !== 'undefined') {
        toastr.options = {
            "closeButton": true,
            "progressBar": true,
            "positionClass": "toast-top-center",
            "timeOut": "3000"
        };
    }

    // -------------------------------------------------------------
    // 2. Dynamic Recipient Name via URL Query (?to=Nama+Tamu)
    // -------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama') || urlParams.get('guest');
    if (guestParam) {
        $('.guest-recipient-name').text(guestParam);
        $('#wish-name-input').val(guestParam);
    }

    // -------------------------------------------------------------
    // 3. Lozad Lazy Loading Initialization
    // -------------------------------------------------------------
    if (typeof lozad === 'function') {
        const observer = lozad('.lozad', {
            threshold: 0.1,
            enableAutoReload: true,
            load: function (el) {
                el.src = el.getAttribute("data-src");
            }
        });
        observer.observe();
    }

    // -------------------------------------------------------------
    // 4. AOS (Animate on Scroll) Initialization
    // -------------------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // -------------------------------------------------------------
    // 5. Flipdown / Flipper & Countdown Timer Initialization
    // -------------------------------------------------------------
    if ($.fn.flipper) {
        try {
            $('#myFlipper').flipper('init');
        } catch (e) {
            console.warn("Flipper error:", e);
        }
    }

    if ($.fn.countdown) {
        const targetEventDate = "2026-12-31 10:00:00";
        $('#countdown').countdown(targetEventDate, function (event) {
            $(this).html(event.strftime('' +
                '<div class=""><span class="badge badge-circle badge-primary label-countdown text-size-content p-3">%D</span><br><small class="text-size-caption">Hari</small></div>' +
                '<div class=""><span class="badge badge-circle badge-primary label-countdown text-size-content p-3">%H</span><br><small class="text-size-caption">Jam</small></div>' +
                '<div class=""><span class="badge badge-circle badge-primary label-countdown text-size-content p-3">%M</span><br><small class="text-size-caption">Menit</small></div>' +
                '<div class=""><span class="badge badge-circle badge-primary label-countdown text-size-content p-3">%S</span><br><small class="text-size-caption">Detik</small></div>'
            ));
        });
    }

    // -------------------------------------------------------------
    // 6. Splide Sliders (Photo Gallery Sync)
    // -------------------------------------------------------------
    if (typeof Splide !== 'undefined') {
        if ($('#main-slider').length && $('#thumbnail-slider').length) {
            const main = new Splide('#main-slider', {
                type: 'fade',
                heightRatio: 1,
                pagination: false,
                arrows: false,
                cover: true,
            });

            const thumbnails = new Splide('#thumbnail-slider', {
                rewind: true,
                fixedWidth: 104,
                fixedHeight: 104,
                isNavigation: true,
                gap: 10,
                focus: 'center',
                pagination: false,
                cover: true,
                dragMinThreshold: {
                    mouse: 4,
                    touch: 10,
                },
                breakpoints: {
                    640: {
                        fixedWidth: 66,
                        fixedHeight: 66,
                    },
                },
            });

            main.sync(thumbnails);
            main.mount();
            thumbnails.mount();
        }
    }

    // -------------------------------------------------------------
    // 7. LightGallery Initialization
    // -------------------------------------------------------------
    if ($.fn.lightGallery) {
        $("#gallery").lightGallery({
            selector: '.gallery-item'
        });
    }

    // -------------------------------------------------------------
    // 8. Cover Modal Show & Preloader
    // -------------------------------------------------------------
    $('#modalInvitation').modal({ backdrop: 'static', keyboard: false });
    $('#modalInvitation').modal('show');
    setTimeout(function () {
        $(".preloader").fadeOut("slow");
    }, 400);

    // -------------------------------------------------------------
    // 9. Audio Player & Floating Music Button Controller
    // -------------------------------------------------------------
    const audio = document.getElementById('audio-player');
    const musicBtn = document.getElementById('btn-floating-music');
    let isMusicPlaying = false;

    window.toggleMusic = function () {
        if (!audio) return;
        if (isMusicPlaying) {
            audio.pause();
            isMusicPlaying = false;
            if (musicBtn) {
                musicBtn.classList.remove('music-spinning');
                musicBtn.innerHTML = '<i class="bi bi-disc text-white fs-2"></i>';
            }
        } else {
            audio.play().then(() => {
                isMusicPlaying = true;
                if (musicBtn) {
                    musicBtn.classList.add('music-spinning');
                    musicBtn.innerHTML = '<i class="bi bi-disc text-white fs-2"></i>';
                }
            }).catch(e => console.warn("Audio play blocked:", e));
        }
    };

    window.openInvitation = function () {
        $('#modalInvitation').modal('hide');
        $('body').removeClass('modal-open').css('overflow', 'auto');
        if (audio) {
            audio.play().then(() => {
                isMusicPlaying = true;
                if (musicBtn) musicBtn.classList.add('music-spinning');
            }).catch(e => {
                console.warn("Autoplay policy error:", e);
            });
        }
    };

    $('#btn-open-invitation').on('click', function () {
        window.openInvitation();
    });

    // -------------------------------------------------------------
    // 10. Copy Account Number to Clipboard
    // -------------------------------------------------------------
    window.copyFromData = function (button) {
        const value = button.dataset.rekening;
        if (!value) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value)
                .then(() => toastr.success("Berhasil menyalin nomor rekening ke clipboard!"))
                .catch(() => fallbackCopy(value));
        } else {
            fallbackCopy(value);
        }
    };

    function fallbackCopy(text) {
        const dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        toastr.success("Berhasil menyalin ke clipboard!");
    }

    // -------------------------------------------------------------
    // 11. Download Instagram Story Image (html2canvas)
    // -------------------------------------------------------------
    window.downloadIGStory = async function (name) {
        const el = document.getElementById('ig-story-area');
        const btnlabel = document.getElementById('label-btn-igstory-download');
        const btnlabelSub = document.getElementById('label-btn-igstory-download-sub');

        if (!el || typeof html2canvas === 'undefined') {
            toastr.error("Fitur download story belum siap.");
            return;
        }

        try {
            if (btnlabel) btnlabel.innerText = 'Menyiapkan Gambar...';
            if (btnlabelSub) btnlabelSub.innerText = 'Mohon tunggu sebentar';

            el.style.display = 'block';
            const canvas = await html2canvas(el, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: null
            });
            el.style.display = 'none';

            const link = document.createElement('a');
            link.download = `Story-${name ? name.replace(/[^a-zA-Z0-9]/g, '-') : 'Arina-Bagas'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            toastr.success("Instagram Story berhasil diunduh!");
        } catch (e) {
            console.error("IG story download error:", e);
            toastr.error("Gagal mendownload gambar.");
        } finally {
            if (btnlabel) btnlabel.innerText = 'Download Template';
            if (btnlabelSub) btnlabelSub.innerText = 'Siap posting di Instagram kamu!';
        }
    };

    // -------------------------------------------------------------
    // 12. Switch QR Code (Check-in / Check-out)
    // -------------------------------------------------------------
    window.switchQR = function () {
        const $btn = $('#btnSwitch');
        const status = $btn.data('qr-status');
        if (status === 'checkout') {
            $('.qr-checkin').removeClass('hide');
            $('.qr-checkout').addClass('hide');
            $btn.data('qr-status', 'checkin');
            $btn.html("Tampilkan QR Checkout");
            $('#label-qr').html("Gunakan QR untuk Checkin!");
        } else {
            $('.qr-checkout').removeClass('hide');
            $('.qr-checkin').addClass('hide');
            $btn.data('qr-status', 'checkout');
            $btn.html("Tampilkan QR Checkin");
            $('#label-qr').html("Gunakan QR untuk Checkout!");
        }
    };

    // -------------------------------------------------------------
    // 13. RSVP Attendance Confirmation (LocalStorage)
    // -------------------------------------------------------------
    window.submitRSVP = function (status) {
        const count = $('#rsvp-people-input').val() || 1;
        const rsvpData = {
            attend: status,
            people: count,
            timestamp: new Date().toLocaleString('id-ID')
        };
        localStorage.setItem('invitation_rsvp', JSON.stringify(rsvpData));

        if (status) {
            $('#alert-attend').removeClass('d-none');
            $('#alert-not-attend').addClass('d-none');
            $('#alert-attend-count').text(`Anda akan hadir: ${count} orang`);
            toastr.success("Terima kasih atas konfirmasi kehadiran Anda!");
        } else {
            $('#alert-not-attend').removeClass('d-none');
            $('#alert-attend').addClass('d-none');
            toastr.info("Konfirmasi ketidakhadiran telah kami catat.");
        }

        setTimeout(() => {
            $('#modalRSVP').modal('hide');
        }, 1200);
    };

    // Restore saved RSVP state if any
    const savedRSVP = localStorage.getItem('invitation_rsvp');
    if (savedRSVP) {
        try {
            const data = JSON.parse(savedRSVP);
            if (data.attend) {
                $('#alert-attend').removeClass('d-none');
                $('#alert-not-attend').addClass('d-none');
                $('#alert-attend-count').text(`Anda akan hadir: ${data.people} orang`);
            } else {
                $('#alert-not-attend').removeClass('d-none');
                $('#alert-attend').addClass('d-none');
            }
        } catch (e) {}
    }

    // -------------------------------------------------------------
    // 14. Wishes (Ucapan & Doa) Dynamic Submission (LocalStorage)
    // -------------------------------------------------------------
    window.submitWish = function (e) {
        if (e) e.preventDefault();
        const $nameInput = $('#wish-name-input');
        const $commentInput = $('#wish-comment-input');
        const name = $nameInput.val().trim();
        const comment = $commentInput.val().trim();

        if (!name || !comment) {
            toastr.warning("Mohon masukkan nama dan pesan doa Anda.");
            return false;
        }

        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const timeStr = now.toLocaleDateString('id-ID', options);

        const newWish = { name, comment, time: timeStr };

        let storedWishes = [];
        try {
            storedWishes = JSON.parse(localStorage.getItem('invitation_wishes') || '[]');
        } catch (e) {}
        storedWishes.unshift(newWish);
        localStorage.setItem('invitation_wishes', JSON.stringify(storedWishes));

        renderWishCard(newWish, true);

        $commentInput.val('');
        toastr.success("Ucapan dan doa Anda berhasil dikirim!");
        return false;
    };

    function renderWishCard(item, prepend) {
        const cardHtml = `
            <div class="rounded rounded-sm p-3 mb-2 bg-secondary text-black animate__animated animate__fadeIn">
                <div class="fw-bold text-start text-size-content">${escapeHtml(item.name)}</div>
                <div class="fw-light mb-1 text-start text-size-caption">
                    <span class="bi bi-clock-history me-1"></span>
                    ${item.time}
                </div>
                <div class="text-start text-size-content">${escapeHtml(item.comment)}</div>
            </div>
        `;
        if (prepend) {
            $('#wishes-list-container').prepend(cardHtml);
        } else {
            $('#wishes-list-container').append(cardHtml);
        }
    }

    function escapeHtml(text) {
        return $('<div>').text(text).html();
    }

    // Load any saved wishes from LocalStorage
    try {
        const storedWishes = JSON.parse(localStorage.getItem('invitation_wishes') || '[]');
        storedWishes.forEach(item => renderWishCard(item, true));
    } catch (e) {}
});
